package com.mahendra.survey.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.*;

@Entity
@Table(name = "respondants")
public class Respondant {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String email;
  private String fullName;
  private Date takenOn;

  @ManyToOne
  @JoinColumn(name = "survey_id")
  private SurveyHeader surveyHeader;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "respondant", fetch = FetchType.EAGER)
  private Set<Answers> answers;

  public Date getTakenOn() {
    return takenOn;
  }

  public void setTakenOn(Date takenOn) {
    this.takenOn = takenOn;
  }

  public void addAnswer(Answers answers) {
    answers.setRespondant(this);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getFullName() {
    return fullName;
  }

  public void setFullName(String fullName) {
    this.fullName = fullName;
  }

  public SurveyHeader getSurveyHeader() {
    return surveyHeader;
  }

  public void setSurveyHeader(SurveyHeader surveyHeader) {
    if (surveyHeader != null) {
      if (surveyHeader.getRespondants() == null) {
        surveyHeader.setRespondants(new HashSet<>());
      }
      surveyHeader.getRespondants().add(this);
    }
    this.surveyHeader = surveyHeader;
  }

  public Set<Answers> getAnswers() {
    return answers;
  }

  public void setAnswers(Set<Answers> answers) {
    this.answers = answers;
    for (Answers answer : answers) {
      answer.setRespondant(this);
    }
  }
}
