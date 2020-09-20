import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbServiceService } from 'src/app/services/db-service.service';
import { Respondant } from 'src/app/common/respondant';
import { SurveyFull } from 'src/app/common/survey-full';

import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { saveAs } from "file-saver/src/FileSaver";
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css']
})
export class SurveyDetailsComponent implements OnInit {

  @ViewChild('respondents', { static: false }) pdfRespondents: ElementRef;
  surveyId: number;
  respondents: Respondant[];
  initailRespondents: Respondant[];
  surveyDetails: SurveyFull;

  constructor(private route: ActivatedRoute, private dbService: DbServiceService, private exportAsService: ExportAsService) { }

  ngOnInit(): void {
    this.surveyId = +this.route.snapshot.paramMap.get('id');
    this.getSurveyDetails();
    // console.log(this.surveyId);
  }

  getSurveyDetails() {
    this.dbService.getSurveyRespondents(this.surveyId).subscribe(
      data => {
        this.respondents = data;
        this.initailRespondents = data;
        this.dbService.getSurvey(this.surveyId).subscribe(
          survey => {
            this.surveyDetails = survey;
          }
        );
      }
    )
  }

  // create json object for survey details
  getJsonDetails() {
    let detailsJson = [{
      "Survey Name": this.surveyDetails?.name,
      "Survey Description": this.surveyDetails?.description,
      "Number of Questions": this.surveyDetails?.questions.length,
      "Number of Responses": this.respondents?.length,
      "Created On": this.surveyDetails?.created,
      "Valid Till": this.surveyDetails?.validTill
    }];
    return detailsJson;
  }

  // create json object for respondents to survey
  getJsonRespondents() {
    let respondentsJson = [];
    this.respondents.forEach(
      respondent => {
        respondentsJson.push({
          "Name": respondent.fullName,
          "Email": respondent.email,
          "Submission Date": respondent.takenOn
        })
      }
    )
    return respondentsJson;
  }

  // download data in json format
  downloadJson(field: string) {
    let jsonData = this.getJsonData(field);
    var blob = new Blob([JSON.stringify(jsonData)], { type: "application/json" });
    var fileName = `${field}.json`;
    saveAs(blob, fileName);
  }

  // get json data by calling appropriate method based on value of field
  private getJsonData(field: string) {
    let jsonData;
    if (field === "details") {
      jsonData = this.getJsonDetails();
    } else {
      jsonData = this.getJsonRespondents();
    }
    return jsonData;
  }

  // create an xlsx workbook with an sheet
  private createXlsxWorkbook(field: string) {
    // https://redstapler.co/sheetjs-tutorial-create-xlsx/
    var wb = XLSX.utils.book_new();
    // wb.Props = {
    //   Title: "Survey Details",
    //   CreatedDate: new Date()
    // };
    wb.SheetNames.push(field);
    let jsonData = this.getJsonData(field);
    var ws = XLSX.utils.json_to_sheet(jsonData);
    wb.Sheets[field] = ws;
    return wb;
  }

  // download data in excel format
  downloadXlsx(field: string) {
    var wb = this.createXlsxWorkbook(field);
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    saveAs(new Blob([this.s2ab(wbout)], { type: "application/octet-stream" }), `${field}.xlsx`);
  }

  downloadCsv(field: string) {
    let ws = this.createXlsxWorkbook(field).Sheets[field];
    let csv = XLSX.utils.sheet_to_csv(ws);
    var blob = new Blob([csv], {type: "text/csv"});
    saveAs(blob, `${field}.csv`);
  }

  downloadDetailsCsv() {
    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Survey Details",
      CreatedDate: new Date()
    };
    wb.SheetNames.push("details");
    var ws = XLSX.utils.json_to_sheet(this.getJsonDetails());
    var csv = XLSX.utils.sheet_to_csv(ws);
    // console.log(csv);
    var blob = new Blob([csv], {type: "text/csv"});
    saveAs(blob, "details.csv");
  }

  // convert into octet stream for saving into xlsx format
  private s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
  }

}
