class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.float :price
      t.integer :status
      t.string :color
      t.integer :capacity

      t.timestamps
    end
  end
end
