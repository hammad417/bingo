class Card < ActiveRecord::Base
  belongs_to :game_user
  serialize :b_pattern, Hash
  serialize :i_pattern, Hash
  serialize :n_pattern, Hash
  serialize :g_pattern, Hash
  serialize :o_pattern, Hash
  attr_accessible :b_pattern, :g_pattern, :i_pattern, :n_pattern, :o_pattern
end
