class User < ActiveRecord::Base
  belongs_to :character
  attr_accessible :email, :full_name, :username
end
