class StaticPagesController < ApplicationController
  def home
  end

  def game_of_life
    render layout: false
  end
end
