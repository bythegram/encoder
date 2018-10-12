import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

let DEFAULT = ['1234567890','qwertyuiop','asdfghjkl','zxcvbnm'];
const DEFAULTMAPPED = DEFAULT.join('');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Limelight Encoder';
  form: FormGroup;
  output: string;
  encodedString: string;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      'encode': new FormControl(null, Validators.required),
      'text': new FormControl(null, Validators.required)
    })
  }

  /**
   * On Form Submit
   */
  handleFormSubmit() {
    this.handleEncoding();
    this.mapText();
  }

  /**
   * Handle encode arguments
   */
  handleEncoding() {
    const encode = this.form.get('encode').value;
    const encodedArray = encode.split(',');
    encodedArray.map(en => {
      const trimmed = en.trim().toUpperCase();
      /**
       * If it is a number
       */
      if(Number(trimmed)) {
        switch (( Number(trimmed) >= 0 )? 1 : -1) {
          case 1: {
            console.log('Positive Shift');
            this.shiftRight(Number(trimmed))

            break
          }
          case -1: {
            console.log('Negative Shift');
            this.shiftLeft(Number(trimmed))

            break
          }
        }
        return false;
      }

      /**
       * Handle Horizontal/Vertical Flips
       */
      switch (trimmed) {
        case ('H'): {
          console.log('Horizontal Flip');
          this.horizontalFlip()
          break
        }
        case ('V'): {
          console.log('Vertical Flip');
          this.verticalFilp()
          break
        }
        default: {
          console.warn('Invalid Code:', trimmed);
        }
      }
    })
    // Final encoded string
    this.encodedString = DEFAULT.join('');
  }

  /**
   * Map Text To Encodeing
   */
  mapText() {
    const text = this.form.get('text').value;
    const mappedArray = text.split('').map(t => {
      const place = DEFAULTMAPPED.indexOf(t.toLowerCase())
      if (place < 0) {
        // Invalid character
        return t;
      }
      // Encoded character
      return this.encodedString[place];
    })
    this.output = mappedArray.join('');
  }

  /**
   * Shift Left
   */
  shiftLeft(places) {
    DEFAULT = DEFAULT.map(d => {
      const asArray = d.split('');
      asArray.unshift.apply(asArray, asArray.splice(3, places));

      return asArray.join('')
    })
  }

  /**
   * Shift Right
   */
  shiftRight(places) {
    DEFAULT = DEFAULT.map(d => {
      const asArray = d.split('');
      asArray.push.apply(asArray, asArray.splice(0, places));

      return asArray.join('')
    })
  }

  /**
   * Horizontal Flip
   */
  horizontalFlip() {
    DEFAULT = DEFAULT.map(d => {
      return d.split('').reverse().join('')
    });
  }

  /**
   * Vertical Flip
   * TODO - Still Yet to complete
   */
  verticalFilp() {
    DEFAULT = DEFAULT;
  }
}
