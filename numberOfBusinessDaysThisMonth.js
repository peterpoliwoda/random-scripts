        const polishPublicHolidays = [
          '01-01',
          '01-06',
          '04-09',
          '04-10',
          '05-01',
          '05-03',
          '06-08',
          '08-15',
          '11-01',
          '11-11',
          '12-25',
          '12-26',
        ];

        const currentMonth = new Date().getMonth();
        const currentMonthPadded = String(new Date().getMonth() + 1).padStart(2, '0');
        const currentYear = new Date().getFullYear();
        // const firstOfMonthString = `${currentYear}-${currentMonthPadded}-01`;
        // const firstOfThisMonth = new Date(firstOfMonthString);
        const lastOfThisMonth = new Date(currentYear, currentMonthPadded, 0);
        const numberOfDaysThisMonth = lastOfThisMonth.getDate();

        let businessDaysThisMonth = 0;

        for (let i = 1; i < numberOfDaysThisMonth; i++) {
          const whatDayIsThis = new Date(currentYear, currentMonth, i);
          const paddedDay = String(i + 1).padStart(2, '0');

          if (whatDayIsThis.getDay() !== 0 && whatDayIsThis.getDay() !== 6
            && (!polishPublicHolidays
              .includes(`${currentMonthPadded}-${paddedDay}`))) {
            businessDaysThisMonth += 1;
          }
        }

        console.log(businessDaysThisMonth);
