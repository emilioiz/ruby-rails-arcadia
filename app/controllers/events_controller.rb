class EventsController < ApplicationController

  def index
    respond_to do |f|
      f.html
      f.json do
        events =  current_user
                  .events
                  .between(params[:start_date], params[:end_date])
                  .event_type(params[:event_type])
        render json: events
      end
    end
  end

  def create
    d = params[:date]
    t = params[:time]
    Event.create(
        user:           current_user,
        activity_date:  (d + ' ' + t).to_datetime.strftime("%Y-%m-%dT%H:%M:%S"),
        notes:          params[:notes],
        eventable_type: params[:type],
        eventable_id:   params[:name]
    )
    puts '========================'
    puts 'Something was created, hopefully in the events table'
    puts '========================='
  end

end
