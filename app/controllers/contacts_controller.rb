class ContactsController < ApplicationController

  def index
    @contact = current_user.contacts.all
    respond_to do |format|
      format.html
      format.json do
        contacts = current_user
                  .contacts
        render json: contacts 
      end
    end
  end

  def create
    @contactadd = Contact.create(
      user: current_user,
      name: params[:name],
      phone1: params[:phone1],
      phone2: params[:phone2],
      fax: params[:fax],
      email: params[:email],
      address1: params[:address1],
      address2: params[:address2],
      city: params[:city],
      state: params[:state],
      zipcode: params[:zipcode],
      country: params[:country],
      notes: params[:notes]
    )
  redirect_to contacts_url
  end

end