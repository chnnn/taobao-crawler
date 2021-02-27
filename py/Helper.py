class Helper:
    @staticmethod
    def padding2(i):
        '''
        return a string, representing padded double digit number.
        0 -> 00; 1 -> 01; 99 -> 99.
        only consider normal cases: (0 <= i <= 99), i is integer.
        '''
        inputRaw = int(i)
        padding = ''
        if inputRaw < 10:
            padding = '0'

        return padding + str(inputRaw)