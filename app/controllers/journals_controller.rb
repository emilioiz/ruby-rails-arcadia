class JournalsController < ApplicationController
  def index
    @journal = current_user.journals.all
    respond_to do |format|
      format.html
      format.json do
        journal = current_user.contacts
        render json: journals
      end
    end
  end

  def show
    @journal = Journal.find(params[:id])
  end

  def new
    @journal = Journal.new
  end

  def create
    @journal = current_user.journals.new(journal_params)

    @journal.save!
    redirect_to journals_url
  end

  private
    def journal_params
      params.require(:journal).permit(:title, :description)
    end
end
