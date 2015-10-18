var config = {
    HOST_NAME: "bbs.7ntxx-13.com",
    LOGIN_URL: "bbs.7ntxx-13.com/member.php?mod=logging&action=login&loginsubmit=yes&infloat=yes&lssubmit=yes&inajax=1",
    LOGIN_URL_PATH: "/member.php?mod=logging&action=login&loginsubmit=yes&infloat=yes&lssubmit=yes&inajax=1",
    loginParam: {
        fastloginfield: "username",
        username: "panf222",
        password: "a111111",
        quickforward: "yes",
        handlekey: "ls"
    },
    TEST_MODULE_URL: "bbs.7ntxx-13.com/forum.php?mod=forumdisplay&fid=41",
    TEST_MODULE_PATH: "/forum.php?mod=forumdisplay&fid=41",
    OPEN_NEW_THREAD_URL: "bbs.7ntxx-13.com/forum.php?mod=post&action=newthread&fid=41&topicsubmit=yes&infloat=yes&handlekey=fastnewpost&inajax=1",
    OPEN_NEW_THREAD_PATH: "/forum.php?mod=post&action=newthread&fid=41&topicsubmit=yes&infloat=yes&handlekey=fastnewpost&inajax=1",
    newThreadParam: {
        subject:"试试",
        message:"1111",
        formhash:"55e1903e",
        usesig:"1",
        posttime:"1444932252"
    }
};

module.exports = config;