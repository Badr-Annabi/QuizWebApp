import unittest

# Discover and run tests
loader = unittest.TestLoader()
suite = loader.discover(start_dir='.', pattern='test_*.py')

runner = unittest.TextTestRunner()
runner.run(suite)
