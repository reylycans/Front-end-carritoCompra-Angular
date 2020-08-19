import { Component, OnInit,Input } from '@angular/core';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  @Input() contador: number = 0;

  faCartArrowDown = faCartArrowDown;
  constructor(public service: ServiceService) { }
  
  ngOnInit(): void {
    
  }

}
