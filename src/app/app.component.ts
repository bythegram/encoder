import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  title = 'Limelight Encoder';
  form: FormGroup;
  output$: Observable<string>;

  constructor(private fb: FormBuilder, private appService: AppService) {
    const defaultEncode = 'V, H, 2, H, V, -2';
    const defaultText = 'Lorem ipsum dolor sit amet';
    this.form = this.fb.group({
      'encode': new FormControl(defaultEncode, Validators.required),
      'text': new FormControl(defaultText, Validators.required)
    });
  }

  /**
   * On Form Submit
   */
  handleFormSubmit() {
    const encode = this.form.get('encode').value;
    const text = this.form.get('text').value;
    this.output$ = this.appService.encodeData(encode, text);
  }

}
