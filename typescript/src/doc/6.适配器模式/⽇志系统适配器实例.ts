// 1.接口定义

interface Logger {
    info(message: string): Promise<void>
}

interface CloudLogger {
    sendToServe(message: string, type: string): Promise<void>
}

// 旧的存储本地的实现类
class FileLogger implements Logger {
    public async info(message: string): Promise<void> {
        console.log(message);
        console.log('This Message was saved with FileLogger')
        return Promise.resolve(undefined);
    }
}

// 我们需要将⽇志保存到云服务
// 器上，⽽不再需要保存到磁盘中。

class AliLogger implements CloudLogger {
    public async sendToServe(message: string, type: string): Promise<void> {
        console.log(message);
        console.info('This Message was saved with AliLogger');
        return Promise.resolve(undefined);
    }
}

// 如果不想修改FileLogger,就可以新建一个适配器
class CloudLoggerAdapter implements Logger {
    protected cloudLogger: CloudLogger;

    constructor(cloudLogger: CloudLogger) {
        this.cloudLogger = cloudLogger;
    }

    public async info(message: string): Promise<void> {
        await this.cloudLogger.sendToServe(message, 'info')
    }
}

// 通知服务类

class NotificationService {
    protected logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    public async send(message: string): Promise<void> {
        await this.logger.info(`Notification sended:  ${message}`)
    }
}

// 使⽤示例
(async () => {
    const aliLogger = new AliLogger();
    const cloudLoggerAdapter = new CloudLoggerAdapter(aliLogger);
    const notificationService = new NotificationService(cloudLoggerAdapter);
    await notificationService.send('Hello Kakuqo, To Cloud');
})();