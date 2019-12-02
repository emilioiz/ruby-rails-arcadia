class ChangeColumnNull < ActiveRecord::Migration[6.0]
  def change
    change_column_null :profiles, :first_name, false
    change_column_null :profiles, :last_name, false
    change_column_default :profiles, :notification_opt_in, true
  end
end