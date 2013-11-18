class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.references :game_user
      t.text :b_pattern
      t.text :i_pattern
      t.text :n_pattern
      t.text :g_pattern
      t.text :o_pattern

      t.timestamps
    end
    add_index :cards, :game_user_id
  end
end
