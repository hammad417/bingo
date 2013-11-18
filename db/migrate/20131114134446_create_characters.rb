class CreateCharacters < ActiveRecord::Migration
  def change
    create_table :characters do |t|
      t.string :title
      t.string :image_url
      t.integer :gender
      t.integer :face
      t.integer :coat
      t.integer :pent

      t.timestamps
    end
  end
end
