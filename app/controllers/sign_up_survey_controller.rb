#=============================================
#DO NOT DELETE THIS FILE
#Save as reference for future functionality
#=============================================

class SignUpSurveyController < ApplicationController
  skip_before_action :authenticate_user

  def index
    @survey       = Survey.first.name || ''
    @question_id  = Survey.first.questions.first.id || ''
    @question     = Survey.first.questions.first.name || ''
  end

  def create
    @question_id = Survey.first.questions.first.id
    session[:responses] = params[@question_id.to_s]
    session[:some_responses] = params[:responses]
    p 'session responses'
    p session[:some_responses]
    @responses = session[:responses]
  end

end
