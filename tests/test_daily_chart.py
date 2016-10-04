import unittest
from unittest.mock import patch

import requests_mock

from dotify.top_songs import DailyChart
from dotify.resources.countries import countries


class TestDailyChart(unittest.TestCase):

    INVALID_COUNTRY_NAME = 'Xylophonia'
    VALID_COUNTRIES_LOOKUP = {
        'Abalonia': {'id': 1, 'abbrev': 'ab'},
        'Condominia': {'id': 2, 'abbrev': 'cd'},
        'Efravania': {'id': 3, 'abbrev': 'ef'},
    }

    @patch.dict(countries, values=VALID_COUNTRIES_LOOKUP, clear=True)
    def test_daily_chart_raises_key_error_for_invalid_country_name(self):
        self.assertRaises(KeyError, DailyChart, self.INVALID_COUNTRY_NAME)
