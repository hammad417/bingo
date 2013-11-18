class GameUser < ActiveRecord::Base
  belongs_to :game
  belongs_to :user
  has_many :cards
  belongs_to :card_match_winner, :class_name => 'User', :foreign_key => 'card_match_winner_id'
  belongs_to :winner, :class_name => 'User', :foreign_key => 'winner_id'
end
