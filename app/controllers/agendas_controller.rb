class AgendasController < ApplicationController

  def index
    @user = current_user
    @prescriptions =  current_user.events.where(user: current_user, eventable_type: "Prescription").map do |prescription_event|
      {
        id: prescription_event.id,
        activity_date: prescription_event.activity_date.to_datetime.strftime("%m-%d    %H:%M"),
        notes: prescription_event.notes,
        prescription: prescription_event.eventable 
      }
    end
    @appointments = current_user.events.where(user: current_user, eventable_type: "Contact").map do |contact_event|
      {
        id: contact_event.id,
        activity_date: contact_event.activity_date.to_datetime.strftime("%m-%d    %H:%M"),
        notes: contact_event.notes,
        appointment: contact_event.eventable
      }
    end
    @contacts = @user.contacts
    @event = current_user.events.all
  end

end
