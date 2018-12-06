import { Injectable } from '@angular/core';

@Injectable()
export class Usuario{
    personas_id: number;
    personas_cedula: string;
    personas_mail: string;
    personas_nombre: string;
}