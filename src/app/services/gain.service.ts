import { Injectable } from "@angular/core";
import { interval, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GainService {
    public dataGainSubject = new Subject<number>();
    public dataGainState = this.dataGainSubject.asObservable();

    public subjectdata(): void {
        interval(1000).subscribe(x => this.dataGainSubject.next(( x++ )));
    }
}