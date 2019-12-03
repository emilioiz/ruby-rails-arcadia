class JournalsController < ApplicationController
  before_action :set_journal, only: [:show, :destroy]

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

  end

  def new
    @journal = Journal.new
  end

  def create
    @journal = current_user.journals.new(journal_params)

    @journal.save!
    redirect_to journals_url
  end

  def destroy
    @journal.destroy
    respond_to do |format|
      format.html do
        redirect_back fallback_location: root_url, notice: "journal entry successfully destroyed"
      end
      format.json do
        render json: @journal
      end
    end
  end

  private
  def journal_params
    params.require(:journal).permit(:title, :description, :image)
  end

  def set_journal
    @journal = Journal.find(params[:id])
  end
end
