import unittest
from unittest.mock import patch

from dotify.top_songs import DailyChart, TopSongsGenerator


class TestTopSongsGenerator(unittest.TestCase):

    TEST_COUNTRY_NAME = 'Argentina'

    @patch.object(DailyChart, 'download')
    def test_top_songs_generator_calls_download_on_daily_chart(self, mock_daily_chart_download):
        _ = TopSongsGenerator(self.TEST_COUNTRY_NAME)

        mock_daily_chart_download.assert_called_once_with()
