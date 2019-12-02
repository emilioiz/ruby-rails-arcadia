class Event < ApplicationRecord

  belongs_to :user
  belongs_to :eventable, polymorphic: true

  scope :between,       ->  (start_date, end_date){
                            where("activity_date between ? and ?", start_date, end_date)
                            }
  scope :event_type,    ->  (event_type){
                            where("eventable_type = ?",event_type)
                             }

end
