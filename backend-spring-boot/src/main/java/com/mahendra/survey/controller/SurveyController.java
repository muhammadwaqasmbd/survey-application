package com.mahendra.survey.controller;

import com.mahendra.survey.dto.AuthResponse;
import com.mahendra.survey.entity.Admin;
import com.mahendra.survey.entity.Respondant;
import com.mahendra.survey.newresponse.SurveyUserResponse;
import com.mahendra.survey.response.Headers;
import com.mahendra.survey.response.Response;
import com.mahendra.survey.response.SurveyFull;
import com.mahendra.survey.security.TokenProvider;
import com.mahendra.survey.service.AdminService;
import com.mahendra.survey.service.SurveyService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("api")
public class SurveyController {

  @Autowired SurveyService surveyService;
  @Autowired AdminService adminService;
  @Autowired PasswordEncoder passwordEncoder;

  @GetMapping("/surveys/responses/{surveyId}")
  public List<Response> getSurveyResponses(@PathVariable("surveyId") Long surveyId) {
    return surveyService.getSurveyResponses(surveyId);
  }

  // delete a survey
  @PostMapping("/surveys/delete")
  public void deleteSurvey(@RequestBody Object object) {
    surveyService.deleteSurvey(Long.valueOf(object.toString()));
  }

  // provides a survey for rendering so that respondent can take survey
  @GetMapping("/surveys/{surveyId}")
  public SurveyFull getSurveyById(@PathVariable("surveyId") Long surveyId) {
    return surveyService.getSurvey(surveyId);
  }

  // checks if a respondent has already completed a survey
  @PostMapping("/respondant/new/{surveyId}")
  public boolean verifyRespondant(
      @RequestBody Respondant respondant, @PathVariable("surveyId") Long surveyId) {
    return surveyService.verifyRespondant(respondant, surveyId);
  }

  // save a response to survey
  @PostMapping("/surveys/response")
  public boolean saveSurveyResponse(@RequestBody SurveyUserResponse surveyUserResponse) {
    System.out.println(surveyUserResponse);
    return surveyService.saveSurveyResponse(surveyUserResponse);
  }

  // create new survey
  @PostMapping("/surveys/create")
  public Headers createNewSurvey(@RequestBody SurveyFull survey) {
//    System.out.println(survey);
    return surveyService.saveSurvey(survey);
  }

  // adds new admin to database
  @PostMapping("/admin/add")
  public Admin addAdmin(@RequestBody Admin admin) {
    Admin adminObj = null;
    if(admin.getId() != null){
      adminObj = adminService.getAdmin(admin.getId());
    }else{
      adminObj = new Admin();
    }
    adminObj.setIsPrimaryAdmin(admin.getIsPrimaryAdmin());
    adminObj.setEmail(admin.getEmail());
    adminObj.setFirstName(admin.getFirstName());
    adminObj.setLastName(admin.getLastName());
    adminObj.setPassword(admin.getId() != null ? adminObj.getPassword(): passwordEncoder.encode(admin.getPassword()));
    return adminService.addAdmin(adminObj);
  }

  // returns a list of all active surveys, sorted by valid till date
  @GetMapping("/surveys/getAll")
  public List<Headers> getAllSurvey() {
    return surveyService.getAllSurvey();
  }

  // returns a list of all admins
  @GetMapping("/admin/getAll")
  public List<Admin> getAllAdmins() {
    return adminService.getAllAdmins();
  }

  // delete admin
  @PostMapping("/admin/delete")
  public void deleteAdmin(@RequestBody Object object) {
    adminService.deleteAdmin(Long.valueOf(object.toString()));
  }

  @GetMapping("/admin/{id}")
  public Admin getAdminById(@PathVariable("id") Long id) {
    return adminService.getAdmin(id);
  }


}
