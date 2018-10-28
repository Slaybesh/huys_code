async function notification_blocker() {
    let TIMES = parseInt(global('TIMES'));
    let higher_prio = parseInt(priority) + 1;

    let Disengaged = parseInt(global('Disengaged'));
    let Disengaged_until = parseInt(global('Disengaged_until'));
    let Pomo = parseInt(global('Pomo'));
    let Pomo_until = parseInt(global('Pomo_until'));

    let Apps_disengage = JSON.parse(global('Apps_disengage'));
    let Apps_pomo = JSON.parse(global('Apps_pomo'));
    let Apps_limit = JSON.parse(global('Apps_limit'));

    let snooze_time;

    if (Disengaged) {
        /* depending on time of day, calc snooze time */
        if (Disengaged_until > TIMES) {
            snooze_time = (Disengaged_until + 60 - TIMES) * 1000;
        } else {
            snooze_time = 1800 * 1000; /* 30 min */
        }

        /* snoozing apps loop */
        for (i in Apps_disengage) {
            performTask('Notification.snooze', higher_prio, Apps_disengage[i], snooze_time);
        }
    }

    if (Pomo) {
        snooze_time = (Pomo_until + 5 - TIMES) * 1000
        for (i in Apps_pomo) {
            performTask('Notification.snooze', higher_prio, Apps_pomo[i], snooze_time);
        }
    }
    
    let package_var;
    let app_json;
    for (i in Apps_limit) {
        package_var = Apps_limit[i].replace(/\./g, '_');
        package_var = package_var.charAt(0).toUpperCase() + package_var.slice(1);
        app_json = JSON.parse(global(package_var));
        snooze_time = (app_json.blocked_until + - TIMES) * 1000;
        performTask('Notification.snooze', higher_prio, Apps_limit[i], snooze_time);
    }
}
notification_blocker()

// function remove_notifications() {
//     var snooze_time;
//     let Snooze_time = parseInt(global('Snooze_time'));
//     let TIMES = parseInt(global('TIMES'));
//     let Disengaged_until = parseInt(global('Disengaged_until'));
//     let Disengaged = (global('Disengaged') === 'true');

//     if (Disengaged || Snooze_time > TIMES) {
//         if (Disengaged_until > TIMES) {
//             snooze_time = (Disengaged_until + 60 - TIMES) * 1000;
//         } else if (Disengaged) {
//             snooze_time = 1800 * 1000;
//         } else {
//             snooze_time = (Snooze_time + 5 - TIMES) * 1000;
//         }

//         let packages = global('All_notification_packages').split(',');
//         for (const i in packages) {
//             let app = packages[i];
//             performTask('Notification.snooze', higher_prio, app, snooze_time);
//         }
//     } else if (!Disengaged) {
//         let Blocked_apps = global('Blocked_apps');
//         let Blocked_times = global('Blocked_times')
//         for (i in Blocked_apps) {
//             if (Blocked_times[i] > TIMES) {
//                 let app = Blocked_apps[i];
//                 performTask('Notification.snooze', higher_prio, app, snooze_time)
//             }
//         }
//     }
// }
