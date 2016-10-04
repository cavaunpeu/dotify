import unittest

import requests_mock

from dotify.top_songs import DailyChart


class TestDailyChart(unittest.TestCase):

    DAILY_CHART_BASE_URL = 'https://spotifycharts.com/regional/{}/daily/latest/download'
    VALID_COUNTRY_CODES = ['ab', 'cd', 'ef']
    INVALID_COUNTRY_CODE = 'xy'

    def _daily_chart_request_callback(self, request, context):
        if self._country_code_is_valid(request):
            pass

    def _country_code_is_valid(self, country_code):
        return country_code in self.VALID_COUNTRY_CODES

    @requests_mock.mock()
    def test_daily_chart_empty_when_querying_invalid_country_code(self, mock_request):
        pass
