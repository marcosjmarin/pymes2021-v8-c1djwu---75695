import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class ArticulosFamiliasService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl =
      "https://labsys.frc.utn.edu.ar:8443/api/ArticulosFamilias";
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }
}
