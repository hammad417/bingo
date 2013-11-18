class Room < ActiveRecord::Base
  has_many :games
  attr_accessible :capacity, :color, :price, :status
end
