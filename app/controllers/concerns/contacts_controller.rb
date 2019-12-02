class ContactsController < ApplicationController
  def index
    @contacts = current_user.contacts.all
    @contact = current_user.contacts.new
    
  end  

  def show

  end
  
  
  def create
    # @contacts = current_user.contacts
    contact = Contact.new(
            name:       params[:name],
            phone1:     params[:phone1],
            phone2:     params[:phone2],
            fax:        params[:fax],
            email:      params[:email],
            address1:   params[:address1],
            address2:   params[:address2],
            city:       params[:city],
            state:      params[:state],
            zipcode:    params[:zipcode],
            country:    params[:country],
            notes:      params[:notes],
            user:       current_user
          )
    respond_to do |format|
      format.html do
        # root_url needs to be changed once we figure out where it will go
        if contact.save
          redirect_to fallback_location: root_url, notice: "Task successfully created"
        else
          redirect_to fallback_location: root_url, alert: contact.errors.full_messages.to_sentence.capitalize
        end
      end
      format.json do
        if contact.save
          render json: contact
        else
          render json: { error: contact.errors.full_messages.to_sentence.capitalize }, status: 400
        end
      end
    end
  end
end
