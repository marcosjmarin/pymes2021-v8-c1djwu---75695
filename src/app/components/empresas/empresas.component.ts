import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresasService } from '../../services/empresas.service';
import { Empresa } from '../../models/empresa';
import { ModalDialogService } from '../../services/modal-dialog.service';
@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  Titulo = 'Empresas';
  TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)'
  };
  AccionABMC = 'L'; // inicialmente inicia en el listado de articulos (buscar con parametros)
  Mensajes = {
    SD: ' No se encontraron registros...',
    RD: ' Revisar los datos ingresados...'
  };
  Items: Empresa[] = null;
  submitted: boolean = false;
  constructor(
    private empresasServicie: EmpresasService,
    public formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService
  ) {}
  FormBusqueda: FormGroup;
  FormRegistro: FormGroup;
  ngOnInit() {
    this.FormRegistro = this.formBuilder.group({
      IdEmpresa: [null],
      RazonSocial: [
        null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(55)]
      ],
      CantidadEmpleados: [
        null,
        [Validators.required, Validators.pattern('^\\d{1,1000000000000000}$')]
      ],
      FechaFundacion: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
          )
        ]
      ],
      Activo: [false]
    });
  }

  Agregar() {
    this.AccionABMC = 'A';
    this.FormRegistro.reset({ Activo: true, IdEmpresa: 0 });
    this.submitted = false;
    this.FormRegistro.markAsUntouched();
  }
  Buscar() {
    this.empresasServicie.get().subscribe((res: Empresa[]) => {
      this.Items = res;
    });
  }

  Consultar(Dto) {
    this.BuscarPorId(Dto, 'C');
  }
  Modificar(Dto) {
    this.submitted = false;
    this.FormRegistro.markAsUntouched();
    this.BuscarPorId(Dto, 'M');
  }
  BuscarPorId(Dto, AccionABMC) {
    window.scroll(0, 0); // ir al incio del scroll

    this.empresasServicie.getById(Dto.IdEmpresa).subscribe((res: any) => {
      const itemCopy = { ...res }; // hacemos copia para no modificar el array original del mock

      //formatear fecha de  ISO 8061 a string dd/MM/yyyy
      var arrFecha = itemCopy.FechaFundacion.substr(0, 10).split('-');
      itemCopy.FechaAlta = arrFecha[2] + '/' + arrFecha[1] + '/' + arrFecha[0];

      this.FormRegistro.patchValue(itemCopy);
      this.AccionABMC = AccionABMC;
    });
  }
  Grabar() {
    this.submitted = true;
    if (this.FormRegistro.invalid) {
      return;
    }

    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormRegistro.value };

    //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
    var arrFecha = itemCopy.FechaFundacion.substr(0, 10).split('/');
    if (arrFecha.length == 3)
      itemCopy.FechaFundacion = new Date(
        arrFecha[2],
        arrFecha[1] - 1,
        arrFecha[0]
      ).toISOString();

    // agregar post
    if (this.AccionABMC == 'A') {
      //this.modalDialogService.BloquearPantalla();
      this.empresasServicie.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.Buscar();
        //this.modalDialogService.DesbloquearPantalla();
      });
    } else {
      // modificar put
      //this.modalDialogService.BloquearPantalla();
      this.empresasServicie
        .put(itemCopy.IdEmpresa, itemCopy)
        .subscribe((res: any) => {
          this.Volver();
          this.modalDialogService.Alert('Registro modificado correctamente.');
          this.Buscar();
          //this.modalDialogService.DesbloquearPantalla();
        });
    }
  }
  Volver() {
    this.AccionABMC = 'L';
  }
}
