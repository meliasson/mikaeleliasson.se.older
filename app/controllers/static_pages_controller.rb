class StaticPagesController < ApplicationController
  def home
  end

  def about
    render layout: false
  end

  def game_of_life
    render layout: false
  end

  def le_tetris
    render layout: false
  end
end
