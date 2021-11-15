import { AfterViewInit, Component } from "@angular/core";
import { ErrorObject } from "../../models/ErrorObject";
import errors from "../../config/errors.json";

@Component({
    selector: "app-error-log-viewer",
    templateUrl: "./error-log-viewer.component.html",
    styleUrls: ["./error-log-viewer.component.scss"]
})
export class ErrorLogViewerComponent implements AfterViewInit {

    errArray: ErrorObject[] = errors;

    reSpace: RegExp = new RegExp(/\s/, "g");

    reLineBreak: RegExp = new RegExp(/\n/, "g");

    reOpenBracket: RegExp = new RegExp(/\(/, "g");

    reCloseBracket: RegExp = new RegExp(/\)/, "g");

    ngAfterViewInit(): void {
        document.querySelectorAll(".code-path").forEach(elem => elem.setAttribute("style", "color: #9a9a9a"));
    }

}
