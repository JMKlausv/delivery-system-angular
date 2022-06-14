import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {
  transform(input: Array<any>, sep = ','): string {
    console.log('transforming.........')
    
    return input.join(sep);
  }
}
