class CreateGameUsers < ActiveRecord::Migration
  def change
    create_table :game_users do |t|
      t.references :game
      t.references :user
      t.integer :winner_id
      t.integer :card_match_winner_id

      t.timestamps
    end
    add_index :game_users, :game_id
    add_index :game_users, :user_id
  end
end
