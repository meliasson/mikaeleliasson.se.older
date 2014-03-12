require 'spec_helper'

describe 'StaticPages' do
  subject { page }

  describe 'About page' do
    before { visit about_path }
    let(:heading) { 'About Us' }
    let(:page_title) { 'About Us' }
    it_should_behave_like 'all static pages'
  end
end
