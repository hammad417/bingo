class Game < ActiveRecord::Base
  belongs_to :room
  has_many :game_users
  serialize :b_pattern, Hash
  serialize :i_pattern, Hash
  serialize :n_pattern, Hash
  serialize :g_pattern, Hash
  serialize :o_pattern, Hash
  attr_accessible :b_pattern, :g_pattern, :i_pattern, :n_pattern, :o_pattern, :status
end
