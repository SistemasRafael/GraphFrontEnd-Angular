import { Component, inject} from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: false,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  loading$: Observable<boolean> = inject(SpinnerService).isLoading$;
}
