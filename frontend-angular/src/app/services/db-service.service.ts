import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SurveyHeader } from '../common/survey-header';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Questions } from '../common/questions';
import { InputTypes } from '../common/input-types';
import { QuestionsOptions } from '../common/questions-options';
import { SurveyFull } from '../common/survey-full';
import { SurveyResponse } from '../common/survey-response';
import { Admin } from '../common/admin';
import { Respondant } from '../common/respondant';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  baseUrl: string = "http://localhost:8090/api/";
  authUrl: string = "http://localhost:8090/auth/";

  constructor(private httpClient: HttpClient) {}

  // gets responses to a survey
  getSurveyResponses(surveyId: number): Observable<any> {
    const url = `${this.baseUrl}surveys/responses/${surveyId}`;
    return this.httpClient.get(url, {headers: headers});
  }

  // gets an array of respondents to a particular survey
  getSurveyRespondents(surveyId: number): Observable<Respondant[]> {
    const url = `${this.baseUrl}surveys/${surveyId}/respondants`;
    return this.httpClient.get<GetRespondents>(url, {headers: headers}).pipe(
      map(data => data._embedded.respondants)
    );
  }

  // delete a survey by id
  deleteSurvey(id: number): Observable<any> {
    const url = `${this.baseUrl}surveys/delete`;
    return this.httpClient.post(url, id, {headers: headers});
  }

  // add another admin
  addAdmin(admin: Admin): Observable<Admin> {
    const url = `${this.baseUrl}admin/add`;
    return this.httpClient.post<Admin>(url, admin, {headers: headers});
  }

  // delete a admin by id
  deleteAdmin(id: number): Observable<any> {
    const url = `${this.baseUrl}admin/delete`;
    return this.httpClient.post(url, id, {headers: headers});
  }

  // get list of admins
  getAdminList(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}admin/getAll`, {headers: headers});
  }

   // gets admin by id
   getAdmin(id: number): Observable<any> {
    const url = `${this.baseUrl}admin/${id}`;
    return this.httpClient.get(url, {headers: headers});
  }

  // verify admin login
  verifyLogin(admin: Admin): Observable<any> {
    const url = `${this.authUrl}login`;
    return this.httpClient.post(url, admin);
  }

  // check if given user has already responded to survey
  verifyUser(id: number, user: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}respondant/new/${id}`, user, {headers: headers});
  }

  // getSurveyList(): Observable<SurveyHeader[]> {
  //   return this.httpClient.get<GetResponseSurveyList>(`${this.baseUrl}surveys/getAll`).pipe(
  //     map(response => response._embedded.surveyHeader)
  //   );
  // }

  // get list of surveys (not expired)
  getSurveyList(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}surveys/getAll`, {headers: headers});
  }

  // get a survey with questions and other details about survey
  getSurvey(id: number): Observable<SurveyFull> {
    return this.httpClient.get<SurveyFull>(`${this.baseUrl}surveys/${id}`, {headers: headers});
  }

  // get survey details by id
  getSurveyHeaderById(id: number): Observable<SurveyHeader> {
    return this.httpClient.get<SurveyHeader>(`${this.baseUrl}surveys/${id}`, {headers: headers})
      // .pipe(map(response => response.surveyHeader))
      ;
  }

  // get questions of a survey by id
  getQuestions(id: number): Observable<Questions[]> {
    return this.httpClient.get<GetQuestionsList>(`${this.baseUrl}surveys/${id}/questions`, {headers: headers}).pipe(
      map(response => response._embedded.questions)
    );
  }

  // get input type of given question 
  // getInputType(id: number): Observable<InputTypes> {
  //   return this.httpClient.get<InputTypes>(`${this.baseUrl}questions/${id}/inputTypeId`)
  //   // .pipe(map(response => response._embedded.inputTypes))
  //   ;
  // }

  // get options of a given question id
  getQuestionsOptions(id: number): Observable<QuestionsOptions[]> {
    return this.httpClient.get<GetQuestionsOptionsList>(`${this.baseUrl}questions/${id}/questionsOptions`, {headers: headers}).pipe(
      map(response => response._embedded.questionsOptions)
    );
  }

  // if a user has not already responded to given survey, then save survey response to DB
  saveSurveyResponse(surveyResponse: SurveyResponse): Observable<any> {
    const url = `${this.baseUrl}surveys/response`;
    return this.httpClient.post(url, surveyResponse, {headers: headers});
  }

  // save a new survey created by admin after logging in to application
  saveNewSurvey(survey: SurveyFull): Observable<any> {
    const url = `${this.baseUrl}surveys/create`;
    return this.httpClient.post(url, survey, {headers: headers});
  }
}

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
})

interface GetResponseSurveyList {
  _embedded: {
    surveyHeader: SurveyHeader[];
  }
}

// interface GetResponseSurveyHeader {
//   surveyHeader: SurveyHeader;
// }

interface GetQuestionsList {
  _embedded: {
    questions: Questions[];
  }
}

// interface GetInputType {
//   inputTypes: InputTypes;
// }

interface GetQuestionsOptionsList {
  _embedded: {
    questionsOptions: QuestionsOptions[];
  }
}

interface GetRespondents {
  _embedded: {
    respondants: Respondant[];
  }
}