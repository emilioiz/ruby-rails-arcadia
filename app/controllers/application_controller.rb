class ApplicationController < ActionController::Base
  before_action :authenticate_user

  private

  def authenticate_user
    if !current_user
      return redirect_to welcome_trail_index_path unless params[:controller].include?('devise')
    end 
  end 

  def after_sign_out_path_for(resource_or_scope)
    user_session_path
  end

end
