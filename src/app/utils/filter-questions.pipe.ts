import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterQuestions'
})
export class FilterQuestionsPipe implements PipeTransform {
  transform(value: any[], type?: any): any {
    if (value) {
      return value.filter(question => question.type === type);
    }
  }
}
