import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

let DEFAULT = ['1234567890','qwertyuiop','asdfghjkl','zxcvbnm'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Limelight Encoder';
  form: FormGroup;
  output: string;

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
    const encode = this.form.get('encode').value;
    const text = this.form.get('text').value;

    const encodedString = this.handleEncoding(encode);
    const defaultList = DEFAULT.join('')
    this.output = this.mapText(encodedString, text, defaultList);
  }

  /**
   * Handle encode arguments
   */
  handleEncoding(encode) {
    const encodedArray = encode.split(',');
    let list = DEFAULT;
    encodedArray.map(en => {
      const trimmed = en.trim().toUpperCase();
      /**
       * If it is a number
       */
      if(Number(trimmed)) {
        switch (( Number(trimmed) >= 0 )? 1 : -1) {
          case 1: {
            console.log('Positive Shift');
            list = this.shiftRight(Number(trimmed), list)

            break
          }
          case -1: {
            console.log('Negative Shift');
            list = this.shiftLeft(Number(trimmed), list)

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
          list = this.horizontalFlip(list)
          break
        }
        case ('V'): {
          console.log('Vertical Flip');
          list = this.verticalFilp(list)
          break
        }
        default: {
          console.warn('Invalid Code:', trimmed);
        }
      }
    })
    // Final encoded string
    return list.join('');
  }

  /**
   * Map Text To Encodeing
   */
  mapText(encodedString, text, defaultList) {
    const mappedArray = text.split('').map(t => {
      const place = defaultList.indexOf(t.toLowerCase())
      if (place < 0) {
        // Invalid character
        return t;
      }
      // Encoded character
      return encodedString[place];
    })
    return mappedArray.join('');
  }

  /**
   * Shift Left - TODO: still needs fixing
   */
  shiftLeft(places, list) {
    const shift = places *= -1;
    return list.map(d => {
      const asArray = d.split('');
      asArray.unshift.apply(asArray, asArray.splice(0, shift));

      return asArray.join('')
    })
  }

  /**
   * Shift Right
   */
  shiftRight(places, list) {
    return list.map(d => {
      const asArray = d.split('');
      asArray.push.apply(asArray, asArray.splice(0, places));

      return asArray.join('')
    })
  }

  /**
   * Horizontal Flip
   */
  horizontalFlip(list) {
    return list.map(d => {
      return d.split('').reverse().join('')
    });
  }

  /**
   * Vertical Flip
   */
  verticalFilp(list) {
    return list.reverse()
  }
}
