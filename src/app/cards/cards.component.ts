import { Component } from '@angular/core';
import { CardsApiService } from "src/app/services/api/cards/cards-api.service";
import { Card } from '../models/card';
import { CarouselComponent } from 'ngx-bootstrap/carousel';

import { HostListener } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})


export class CardsComponent {

  public cards: Card[] = this.cardsApiService.getCardsList();
  public cardsFinals: Card[] = [];
  public isLoading = true;
  public isSmallScreen = false;
  public isLargeScreen = false;
  public anyCheckboxSelected: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(_event: any) {
    this.isSmallScreen = window.innerWidth <= 768;
  }


  onCheckboxChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.anyCheckboxSelected = true;
    } else {
      // Verifica si algún otro checkbox está seleccionado
      const anyOtherCheckboxSelected = this.cardsFinals.some(card => card.selected);
  
      this.anyCheckboxSelected = anyOtherCheckboxSelected;
    }
  }
  

  constructor(
   public cardsApiService : CardsApiService
  ) { }

 
  async ngOnInit() {
    this.isSmallScreen = window.innerWidth <= 768 ;
    this.isLargeScreen = window.innerWidth >= 768 ;


    await this.cardsApiService.getCards();
    this.cards = this.cardsApiService.getCardsList();
    
    for (let i = 0; i < this.cards.length; i++) {   
        for (let j = 0; j < this.cards[i].listCard?.length; j++) {
          this.cardsFinals.push(this.cards[i].listCard[j]);
        }
     break;
    }
    this.isLoading = false;
  }

  slidePrev(carousel: CarouselComponent): void {
    carousel.previousSlide();
  }

  slideNext(carousel: CarouselComponent): void {
    carousel.nextSlide();
  }

}
