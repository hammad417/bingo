class Character < ActiveRecord::Base
  has_many :users
  attr_accessible :coat, :face, :gender, :image_url, :pent, :title
end
