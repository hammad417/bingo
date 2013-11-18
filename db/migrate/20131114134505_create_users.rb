class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :full_name
      t.references :character

      t.timestamps
    end
    add_index :users, :character_id
  end
end
