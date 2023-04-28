import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom, Observable } from "rxjs";
import { Err, Ok, Result } from "ts-results";
import { SearchResult } from "./apiTypes";




export interface ApiWithSearch<T> {
    search(
        userSearch?: string,
        currentSearchPage?: number,
        searchLimit?: number
    ): Observable<SearchResult<T>>;

    count(): Promise<number>;
}

@Injectable({
    providedIn: "root",
})
export class ApiService {
    constructor(protected httpClient: HttpClient) {}

 

    /**
     * Hace una solicitud GET simple a la API utilizando la URL proporcionada.
     *
     * @template T - El tipo de dato que se espera recibir de la API.
     * @param {string} url - La URL a la que se enviará la solicitud GET.
     * @returns {Observable<Result<T, Error>>} - Retorna un Observable que emite un objeto Result.
     *    Si la solicitud es exitosa, el objeto Result será Ok<T>, donde T es el tipo de dato esperado.
     *    Si ocurre un error en la solicitud, el objeto Result será Err<Error>.
     */
    protected makeSimpleGetRequest<T>(url: string) {
        return this.observableToResult<T>(
            this.httpClient.get(`${url}`, {
                withCredentials: true,
            })
        );
    }

    protected async observableToResult<T>(
        observable: Observable<any>
    ): Promise<Result<T, Error>> {
        try {
            return Ok(await lastValueFrom(observable));
        } catch (error: any) {
            return Err(error);
        }
    }

    protected makeSimplePostRequest<T>(url: string, body: any) {
        return this.observableToResult<T>(
            this.httpClient.post(`${url}`, body, {
                withCredentials: true,
            })
        );
    }
}
