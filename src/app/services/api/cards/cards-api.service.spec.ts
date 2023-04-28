import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CardsApiService } from './cards-api.service';
import { Card } from 'src/app/models/card';

describe('CardsApiService', () => {
    let service: CardsApiService;
    let httpTestingController: HttpTestingController;
  
    beforeAll(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [CardsApiService],
      });
    });
  
    beforeEach(() => {
      service = TestBed.inject(CardsApiService);
      httpTestingController = TestBed.inject(HttpTestingController);
    });
  
    afterEach(() => {
      httpTestingController.verify(); // Verifica que no haya solicitudes pendientes
    });
  it('should get cards from the API and store them in the cards array', async () => {
    // Datos de prueba
    const mockCards: Card[] = [
      new Card('MFUND', 789654123, '4000000', 'Ya tienes un 15% de tu objetivo', false),
      new Card('Producto 2', 5678, '2000', 'Detalles 2', false),
    ];
  
    // Espía el método `makeSimpleGetRequest` de `CardsApiService` para que devuelva una promesa con los datos de prueba
    const spy = jasmine.createSpyObj('CardsApiService', ['makeSimpleGetRequest']);
    spy.makeSimpleGetRequest.and.returnValue(Promise.resolve({ ok: true, val: mockCards }));
  
    // Reemplaza el servicio con el espía
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: CardsApiService, useValue: spy }],
    });
  
    service = TestBed.inject(CardsApiService);
  
    // Ejecuta el método getCards
    await service.getCards();
  
    // Verifica que se haya realizado la solicitud GET correcta
    expect(spy.makeSimpleGetRequest).toHaveBeenCalledWith('/api/v1/test-front-end-skandia/cards');
  
    // Verifica que las tarjetas se hayan agregado a la lista de cards
    expect(service.getCardsList()).toEqual(mockCards);
    expect(service.isDataLoaded).toBeTrue();
  });

});
