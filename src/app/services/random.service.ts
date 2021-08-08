import { Injectable } from "@angular/core";
import { interval, Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class RandomService {
    public dataSubject = new Subject<number>();
    public dataState = this.dataSubject.asObservable();

    public subjectdata(): void {
        interval(1000).subscribe(x => this.dataSubject.next((Math.floor(Math.random() * 200) - 100)));
    }
}
