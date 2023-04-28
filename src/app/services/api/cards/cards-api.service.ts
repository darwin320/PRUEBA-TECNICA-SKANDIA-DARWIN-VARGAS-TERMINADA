

import { Injectable } from "@angular/core";
import { Card } from 'src/app/models/card';
import { ApiService, ApiWithSearch } from "../api.service";
import { Observable, from } from "rxjs";
import { SearchResult } from "../apiTypes";


//en esta clase consumo la api referente a las tarjetas que se deben mostrar en el aplicativo



@Injectable({
    providedIn: "root",
})

export class CardsApiService
    extends ApiService
    

    
{

    //esta variable es declarada para una vez que los datos esten cargados estos se puedan mostrar en la pantalla
    //solamente cuando esten cargados y de esta manera no se generen cards vacios.

    public isDataLoaded = false;

    //creo una lista de cards que alimentare con la solicitud get que hare posteriormente
    private cards: Card[] = [];
   


    /**
     * Este metodo se encarga de hacer la solicitud GET al api dada para poder obtener los valores
     * correspondientes a cada tarjeta los cuales se asociaran a la lista de tarjetas previamente creadas
     */
    public async getCards() {
        const result = await this.makeSimpleGetRequest<Card>("/api/v1/test-front-end-skandia/cards");
    
        if (result.ok) {
            for (const card of [result.val]) {
                this.cards.push(card);
            }

            this.isDataLoaded = true;
        } else {
            console.error("Ha ocurrido un error es posible que el link no sea valido ");
        }
       
        
    }

    
    
    public getCardsList(): Card[] {
        return this.cards;
    }
    
  
    
    
}